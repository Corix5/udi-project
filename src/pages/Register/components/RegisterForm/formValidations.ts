import Swal from "sweetalert2";

export const validateIdNumber = (idNumber: string) => {
  return /^\d*$/.test(idNumber) && idNumber.length <= 10;
};

export const validateName = (name: string) => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ´\s]*$/.test(name);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "warning",
      title: "Ingresa un correo válido",
    });
  } else {
    return true;
  }
};

export const alertEmptyFields = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "warning",
    title: "Llena todos los campos",
  });
};

export const validateForm = (student: any) => {
  if (
    student.name === "" ||
    student.idNumber === "" ||
    student.email === "" ||
    student.equipment === "" ||
    student.date === "" ||
    student.entryTime === ""
  ) {
    alertEmptyFields();
    return false;
  } else {
    Swal.fire({
      title: "¡Registro exitoso!",
      icon: "success"
    });
    return true;
  }
}
