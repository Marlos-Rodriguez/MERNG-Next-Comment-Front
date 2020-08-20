import React from "react";

import Swal from "sweetalert2";

const AlertHook = (callback) => {
  Swal.fire({
    title: "<h2>Are you sure?</h2>",
    html: "<h2>You won't be able to revert this!</h2>",
    icon: "warning",
    width: "40rem",
    padding: "0",
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    confirmButtonClass: "Alert-Button",
    cancelButtonText: "Cancel",
    cancelButtonClass: "Alert-Button-Cancel",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: "<h2>Deleted</h2>",
        html: "<h2>Your Post has been deleted.</h2>",
        icon: "success",
        width: "30rem",
        padding: "1rem",
        buttonsStyling: false,
        confirmButtonClass: "Alert-Button",
        confirmButtonText: "OK",
      });
      callback();
    }
  });
};

export default AlertHook;
