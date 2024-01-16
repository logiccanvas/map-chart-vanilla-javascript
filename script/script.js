const select = document.querySelector("select.select-country");
const groups = document.querySelectorAll("g");
const tooltip = document.querySelector(".tooltiptext8575285793496");

const countries = [
  {
    id: "US8575285793496",
    name: "United States of America",
    color: "#002c73",
    flag: "",
    population: "339,996,563",
  },
  {
    id: "RU8575285793496",
    name: "Rasian Federation",
    color: "#dd171b",
    flag: "",
    population: "144,444,359",
  },
  {
    id: "PK8575285793496",
    name: "Pakistan",
    color: "#10543e",
    flag: "",
    population: "240,485,658",
  },
  {
    id: "CN8575285793496",
    name: "China",
    color: "#706233",
    flag: "",
    population: "1,425,671,352",
  },
  {
    id: "CA8575285793496",
    name: "Canada",
    color: "#d10620",
    flag: "",
    population: "38,781,291",
  },
  {
    id: "GL8575285793496",
    name: "Greenland",
    color: "#E7B10A",
    flag: "",
    population: "56,643",
  },
  {
    id: "TD8575285793496",
    name: "Chad",
    color: "#A9907E",
    flag: "",
    population: "18,278,568",
  },
];

const getTooltipStyle = (groupBounds) => {
  const tooltipX = groupBounds.right - groupBounds.width / 3;
  const tooltipY = groupBounds.bottom - groupBounds.height / 3;

  return `
          visibility: visible;
          opacity: 1;
          top: ${tooltipY}px;
          left: ${tooltipX}px;
          `;
};

const getTooltipText = (country) => {
  const { name, population } = country;
  return `${name}
          population: ${population}
        `;
};

const displayTooltip = (show, group) => {
  if (!show) {
    tooltip.style.cssText = `visibility: hidden; opacity: 0;`;
    return;
  }

  const groupBounds = group.getBoundingClientRect();

  const selectedCountry = countries.filter(
    (country) => country.id === group.id
  )[0];

  if (selectedCountry) {
    tooltip.style.cssText = getTooltipStyle(groupBounds);
    tooltip.innerHTML = getTooltipText(selectedCountry);
    group.style.fill = selectedCountry.color || "#a0c1f8";
  }
};

function handleMouseOut() {
  displayTooltip(false);

  if (!this.classList.value.includes("selected")) {
    this.removeAttribute("style");
  }
}

function handleMouseOver() {
  displayTooltip(true, this);
}

groups.forEach((group) => {
  const id = group.getAttribute("id");
  if (id !== "viewport-20231107193000834") {
    group.addEventListener("mouseover", handleMouseOver);
    group.addEventListener("mouseout", handleMouseOut);
  }
});

select.addEventListener("change", function () {
  const selectedOptions = Array.from(this.selectedOptions).map(
    (option) => option.value
  );

  groups.forEach((group) => {
    group.removeAttribute("style");
    group.classList.remove("selected");
  });

  const selectedCountries = countries.filter((country) =>
    selectedOptions.includes(country.id)
  );

  selectedCountries.forEach((selected) => {
    const group = document.getElementById(selected.id);

    if (group) {
      group.style.fill = selected.color;
      group.classList.add("selected");
    }
  });
});
