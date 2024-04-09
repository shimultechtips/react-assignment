import React from "react";
import { createRoot } from "react-dom/client";

import NotificationsManager from "./NotificationsManager";
import Notification, { Color } from "./Notification";
import createContainer from "./createContainer";

const containerElement = createContainer();
let notify;

createRoot(containerElement).render(
  <NotificationsManager
    setNotify={(notifyFn) => {
      notify = notifyFn;
    }}
  />
);


export { Notification, Color };

export function info(children, autoClose) {
  return notify({
    color: Color.info,
    children,
    autoClose,
  });
}

export function success(children, autoClose) {
  return notify({
    color: Color.success,
    children,
    autoClose,
  });
}

export function warning(children, autoClose) {
  return notify({
    color: Color.warning,
    children,
    autoClose,
  });
}

export function error(children, autoClose) {
  return notify({
    color: Color.error,
    children,
    autoClose,
  });
}
