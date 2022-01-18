import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router";
import Axios from "axios";
import { useParams } from "react-router-dom";

function DynamicRouter(props) {
  const local = useLocation();
  const [dynamicDom, setDynamicDom] = useState(undefined);
  const { appName } = useParams();
  const { pathname } = local;
  const isMicro = useMemo(() => {
    try {
      const temp = pathname.split("/");
      const isMicro = temp[1] === "micro";
      return isMicro;
    } catch {
      return false;
    }
  }, [pathname]);

  const getAssets = async (assetUri) => {
    try {
      return await Axios.get(`${assetUri}?timestamp=${new Date().getTime()}`);
    } catch (error) {
      console.log(error);
    }
  };

  const loadScript = (jsFile, id) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", jsFile);
      script.setAttribute("data-dynamic-component-id", id);
      script.setAttribute("crossorigin", "");
      script.onload = () => {
        console.log("리죨브");
        resolve(window[id]);
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.body.appendChild(script);
    });
  };

  const loadStyle = (cssFile, id) => {
    return new Promise((resolve, reject) => {
      const style = document.createElement("link");
      style.setAttribute("rel", "stylesheet");
      style.setAttribute("type", "text/css");
      style.setAttribute("data-dynamic-style-id", id);
      style.setAttribute("basicPath", basicPath);
      style.setAttribute("href", cssFile);
      style.onload = () => {
        resolve(true);
      };
      style.onerror = (error) => {
        reject(error);
      };
      document.head.insertBefore(style, document.getElementById("-globalcss"));
    });
  };
  const importComponent = async (rootUrl, assetName) => {
    const assetUrl = rootUrl + assetName;
    const response = await getAssets(assetUrl);
    if (!response.hasOwnProperty("data")) return;
    const assets = response.data;

    const promiseAll = [];
    const { id } = assets;
    const jsFile = rootUrl + "/" + assets.files[id + ".js"];

    let importedScript = document.querySelector(
      `script[data-dynamic-component-id="${id}"]`
    );
    //  이미 데이터가있을경우 reload처리
    // if (importedScript && importedScript.getAttribute('src') !== jsFile) {
    //   window[id] = null;
    //   window[id + '-public-path'] = null;
    //   document.body.removeChild(importedScript);
    //   importedScript = null;
    // }
    // 데이터가 없으
    if (importedScript == null) {
      promiseAll.push(loadScript(jsFile, id));
    }

    // if (assets.files[id + '.css']) {
    //   const cssFile = uri + assets.files[id + '.css'];
    //   let importedStyle = document.querySelector(`link[data-dynamic-style-id="${id}"]`);
    //   if (importedStyle && importedStyle.getAttribute('href') !== cssFile) {
    //     document.head.removeChild(importedStyle);
    //     importedStyle = null;
    //   }
    // promiseAll.push(loadStyle(importedStyle, cssFile, id));
    try {
      window[id + "-public-path"] = window.location.origin + rootUrl + "/";
      const res = await Promise.all(promiseAll);
      const resComponent = res[0];
      // console.log(resComponent, "테스트");
      resComponent.id = id;
      setDynamicDom(resComponent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isMicro) {
      const rootUrl = `/media/micro/${appName}`;
      const assetName = "/asset-manifest.json";
      importComponent(rootUrl, assetName);
    }
  }, [isMicro]);
  if (dynamicDom) {
    return (
      <div>
        <dynamicDom.App basicPath={pathname}></dynamicDom.App>
      </div>
    );
  }
  return <div>컴포넌트 로딩중~~</div>;
}

export default DynamicRouter;
