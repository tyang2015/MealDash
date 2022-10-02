import usePlacesAutocomplete from "use-places-autocomplete";

const PlacesAutocomplete = () => {
  const { value, setValue } = usePlacesAutocomplete();
  console.log('use places component hit')
  const handleInput = (e) => {
    // Place a "string" to update the value of the input element
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="address-dropdown">Address</label>
      <input id='address-dropdown' value={value} onChange={handleInput} />
      {/* Render dropdown */}
    </div>
  );
};

export default PlacesAutocomplete
