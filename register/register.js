// Keep count of participants currently rendered
let participantCount = 1;

// Helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** Participant template
 *  NOTE:
 *   - id attributes and radio "name" groups must be unique per participant
 *   - we suffix with the count (2, 3, 4, …)
 */
function participantTemplate(count){
  return `
  <section class="participant participant${count}" aria-label="Participant ${count}">
    <h3>Participant ${count}</h3>
    <div class="grid-2">
      <label for="pname${count}">
        Full name
        <input id="pname${count}" name="participantName[]" type="text" required placeholder="e.g., Adjoa K." />
      </label>

      <label for="age${count}">
        Age
        <input id="age${count}" name="participantAge[]" type="number" min="0" inputmode="numeric" placeholder="e.g., 10" />
      </label>

      <fieldset class="inline-fieldset">
        <legend>T-shirt size</legend>
        <label class="radio-pill">
          <input type="radio" name="size${count}" id="size-s${count}" value="S" checked />
          <span>S</span>
        </label>
        <label class="radio-pill">
          <input type="radio" name="size${count}" id="size-m${count}" value="M" />
          <span>M</span>
        </label>
        <label class="radio-pill">
          <input type="radio" name="size${count}" id="size-l${count}" value="L" />
          <span>L</span>
        </label>
        <label class="radio-pill">
          <input type="radio" name="size${count}" id="size-xl${count}" value="XL" />
          <span>XL</span>
        </label>
      </fieldset>

      <label for="fee${count}">
        Fee (USD)
        <input id="fee${count}" name="participantFee[]" type="number" min="0" step="0.01" placeholder="e.g., 25.00" />
      </label>
    </div>
  </section>
  `;
}

/** Compute sum of all fee inputs (ids starting with "fee") */
function totalFees(){
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  const total = feeElements.reduce((sum, el) => {
    const value = parseFloat((el.value || "").trim());
    // ignore NaN, negative, or empty (treat as 0)
    if (!Number.isFinite(value) || value < 0) return sum;
    return sum + value;
  }, 0);

  // round to two decimals to avoid float artifacts
  return Math.round(total * 100) / 100;
}

/** Build success message HTML */
function successTemplate({ name, count, total }){
  return `
    <div class="success">
      <p>✅ Thank you <strong>${name}</strong> for registering!</p>
      <p>You have registered <strong>${count}</strong> participant${count === 1 ? "" : "s"} and owe <strong>$${total.toFixed(2)}</strong> in fees.</p>
      <p>We’ll contact you soon with next steps.</p>
    </div>
  `;
}

/** Basic validation (minimal, friendly) */
function validateForm(){
  const adultName = $("#adult-name");
  if (!adultName.value.trim()){
    adultName.focus();
    return { ok: false, message: "Please enter the adult contact’s full name." };
  }

  // Require each participant to have a name if any fields exist
  const participantSections = $$("#participants .participant");
  for (const sec of participantSections){
    const nameInput = $("input[id^='pname']", sec);
    if (nameInput && !nameInput.value.trim()){
      nameInput.focus();
      return { ok: false, message: "Please enter each participant’s name." };
    }
  }

  // Fees: no negatives
  const feeInputs = $$("input[id^='fee']");
  for (const fee of feeInputs){
    const raw = fee.value.trim();
    if (raw === "") continue; // empty allowed, treated as 0
    const num = Number(raw);
    if (!Number.isFinite(num) || num < 0){
      fee.focus();
      return { ok: false, message: "Fees must be positive numbers (or leave blank)." };
    }
  }

  return { ok: true };
}

/** Event: Add Participant */
function onAddParticipant(){
  participantCount += 1;
  const btn = $("#add-participant");
  // Insert new participant section just before the Add button
  btn.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
  // Optionally, focus the new name field for fast entry
  const newName = $(`#pname${participantCount}`);
  if (newName) newName.focus();
}

/** Event: Submit Form */
function onSubmit(e){
  e.preventDefault();

  const check = validateForm();
  if (!check.ok){
    alert(check.message);
    return;
  }

  const name = $("#adult-name").value.trim();
  const participants = $$("#participants .participant").length || 0;
  const total = totalFees();

  // Hide form, show summary
  $("#register-form").classList.add("hide");
  const summary = $("#summary");
  summary.innerHTML = successTemplate({ name, count: participants, total });
  summary.classList.remove("hide");
}

/** Init */
document.addEventListener("DOMContentLoaded", () => {
  // footer year
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // initial state
  participantCount = 1;

  // add handlers
  $("#add-participant").addEventListener("click", onAddParticipant);
  $("#register-form").addEventListener("submit", onSubmit);
});
