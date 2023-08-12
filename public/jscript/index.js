let date = new Date();
date = date.toLocaleString(); // 5/12/2020, 6:50:21 PM
document.querySelector(".date").innerHTML = `${date}`;

document.querySelectorAll(".expire").forEach((input) => {
  input.oninput = () => {
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});
