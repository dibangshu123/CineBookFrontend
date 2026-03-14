const container = document.getElementById("seat-container");
const selectedSeatsDisplay = document.getElementById("selectedSeats");
const totalPriceDisplay = document.getElementById("totalPrice");

let selectedSeats = [];
let totalPrice = 0;

// Section Pricing
const sections = {
  silver: { rows: ["I", "J"], price: 150 },
  gold: { rows: ["G", "H"], price: 200 },
  platinum: { rows: ["D", "E", "F"], price: 250 },
  diamond: { rows: ["A", "B", "C"], price: 300 }
};

// Create Seats
for (let section in sections) {
  sections[section].rows.forEach(rowLetter => {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let i = 1; i <= 10; i++) {
      let seat = document.createElement("div");
      seat.classList.add("seat", section);
      seat.dataset.seat = rowLetter + i;
      seat.dataset.price = sections[section].price;

      seat.addEventListener("click", () => selectSeat(seat));
      row.appendChild(seat);
    }

    container.appendChild(row);
  });
}

function selectSeat(seat) {
  const seatName = seat.dataset.seat;
  const price = parseInt(seat.dataset.price);

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter(s => s !== seatName);
    totalPrice -= price;
  } else {
    seat.classList.add("selected");
    selectedSeats.push(seatName);
    totalPrice += price;
  }

  selectedSeatsDisplay.innerText =
    selectedSeats.length > 0 ? selectedSeats.join(", ") : "None";

  totalPriceDisplay.innerText = totalPrice;
}

function goPayment() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat!");
    return;
  }

  alert("Seats Selected: " + selectedSeats.join(", ") +
        "\nTotal: ₹" + totalPrice);

  window.location.href = "payment.html";
}
