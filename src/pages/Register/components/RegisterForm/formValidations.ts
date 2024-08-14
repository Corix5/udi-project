import Swal from "sweetalert2";

export const validateid_number = (id_number: string) => {
  return /^\d*$/.test(id_number) && id_number.length <= 10;
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

export const validateForm = (student: any, register:any) => {
  if (
    student.name === "" ||
    student.id_number === "" ||
    student.email === "" ||
    register.equipment_id === "" ||
    register.equipment_name === "" ||
    register.date === "" ||
    register.entry_time === ""
  ) {
    alertEmptyFields();
    return false;
  } else {
    return true;
  }
}

export const registerAlert = () => {
  Swal.fire({
    title: "¡Registro exitoso!",
    icon: "success"
  });
}

export const updateAlert = () => {
  Swal.fire({
    title: "¡Registro actualizado!",
    icon: "success"
  });
}

export const badRegisterAlert = () => {
  Swal.fire({
    title: "Ocurrió un error",
    icon: "error"
  });
}

export const invalidCredentialsAlert = () => {
  Swal.fire({
    title: "Credenciales inválidas",
    icon: "error"
  });
}