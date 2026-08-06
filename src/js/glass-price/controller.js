import { sel } from "../util/methods.js";
import { DEFAULT_FULLSHEET_PRICE } from "./constants.js";
import { buildGlassEntry, calculateGlassPrice } from "./calculation.js";
import { clearEntries, readCounter, readEntries, saveCounter, saveEntries } from "./storage.js";
import { validateForm } from "./validation.js";

function getInputValue(selector) {
  return sel(selector)?.value ?? "";
}

function setInputValue(selector, value) {
  const element = sel(selector);
  if (element) {
    element.value = value;
  }
}

export function initGlassPriceCalculator({ onEntriesChange, onFeedbackChange }) {
  if (typeof window === "undefined") return null;

  const form = sel(".glass-price-form");
  const calculateButton = sel(".calculate");
  const addToTableButton = sel(".addToTable");
  const addToCartButton = sel(".addToCart");
  const resetButton = sel(".reset");

  if (!form || !calculateButton || !addToTableButton || !addToCartButton) {
    return null;
  }

  let entries = readEntries();
  let counter = readCounter();

  const emitState = () => {
    onEntriesChange?.(entries);
    onFeedbackChange?.(getFeedbackMessage(entries));
  };

  const readValues = () => ({
    width: getInputValue("#width_input"),
    height: getInputValue("#height_input"),
    quantity: getInputValue("#quantity_input"),
    fullSheetPrice: getInputValue("#fullsheet-price_input") || DEFAULT_FULLSHEET_PRICE,
  });

  const handleCalculation = (persistEntry = false, label = "saved") => {
    const values = readValues();
    const validation = validateForm(values);

    if (!validation.isValid) {
      onFeedbackChange?.(validation.message);
      return null;
    }

    const calculation = calculateGlassPrice(values);
    const entry = buildGlassEntry({
      id: counter + 1,
      values,
      calculation,
    });

    counter += 1;
    saveCounter(counter);

    if (persistEntry) {
      const existingIndex = entries.findIndex((item) => item.size === entry.size);

      if (existingIndex >= 0) {
        entries[existingIndex] = entry;
      } else {
        entries = [...entries, entry];
      }

      saveEntries(entries);
    }

    const message = persistEntry
      // ? `Added ${entry.size} to ${label}. Total: ₦${entry.price}`
      // : `Glass price for ${entry.size}: ₦${entry.price}`;
      ?( label, entry): entry;

    onFeedbackChange?.(message);
    onEntriesChange?.(entries);

    return { entry, calculation };
  };

  const handleReset = () => {
    setInputValue("#width_input", "400");
    setInputValue("#height_input", "900");
    setInputValue("#quantity_input", "1");
    setInputValue("#fullsheet-price_input", "90000");
    entries = [];
    counter = 0;
    clearEntries();
    onEntriesChange?.(entries);
    onFeedbackChange?.("Form reset. Enter a new size to calculate a fresh price.");
  };

  const handleCompute = () => handleCalculation(false);
  const handleAddToTable = () => handleCalculation(true, "table");
  const handleAddToCart = () => handleCalculation(true, "cart");

  calculateButton.addEventListener("click", handleCompute);
  addToTableButton.addEventListener("click", handleAddToTable);
  addToCartButton.addEventListener("click", handleAddToCart);
  resetButton.addEventListener("click", handleReset);

  emitState();

  return {
    destroy() {
      calculateButton.removeEventListener("click", handleCompute);
      addToTableButton.removeEventListener("click", handleAddToTable);
      addToCartButton.removeEventListener("click", handleAddToCart);
      resetButton.removeEventListener("click", handleReset);
    },
    getEntries() {
      return entries;
    },
  };
}

function getFeedbackMessage(entries) {
  if (!entries.length) {
    return "No previous entries";
  }

  const total = entries.reduce((sum, entry) => sum + entry.price, 0);
  return `Showing ${entries.length} saved entr${entries.length === 1 ? "y" : "ies"}. Total: ₦${total}`;
}
