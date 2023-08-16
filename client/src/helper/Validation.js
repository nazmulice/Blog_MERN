import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

class Validation {
  isEmpty(value) {
    if (value.length == 0) {
      return true;
    } else {
      return false;
    }
  }
  successToast(msg) {
    Toastify({
      text: msg,
      className: "info",
      offset: {
        x: 100,
        y: 65,
      },
      style: {
        background: "green",
      },
    }).showToast();
  }
  errorToast(msg) {
    Toastify({
      text: msg,
      className: "info",
      offset: {
        x: 100,
        y: 65,
      },
      style: {
        background: "red",
      },
    }).showToast();
  }

  cancelToast(msg) {
    Toastify({
      text: msg,
      duration: 2400,
      className: "info",
      offset: {
        x: 50,
        y: 60,
      },
      position: "center",
      style: {
        background: "yellow",
        color: "black",
      },
    }).showToast();
  }
}

export const { isEmpty, successToast, errorToast, cancelToast } =
  new Validation();
