import React, { useState, useRef } from "react";
import Select from "react-select";
import countriesData from "./countries+states+cities.json";
import { useForm, Controller } from "react-hook-form";

const CountryStateCitySelector = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [statesData, setStates] = useState([]);
  const [citiesData, setCities] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    const selectedCountry = countriesData.find(
      (country) => country.name === selectedOption.value
    );

    if (selectedCountry) {
      setStates(selectedCountry.states || []);
    }
    console.log(selectedCountry);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    const selectedState = statesData.find(
      (state) => state.name === selectedOption.value
    );

    if (selectedState) {
      setCities(selectedState.cities || []);
    }

    setSelectedCity(null);
    console.log(selectedState);
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);

    const cityData = citiesData.find(
      (city) => city.name === selectedOption.value
    );
    console.log(cityData);
  };

  const handleSave = (data) => {
    console.log("Form Data is: ", data);

    const newData = {
      country: data.country.label,
      state: data.state.label,
      city: data.city.label,
    };

    setSelectedValues((prevValues) => [...prevValues, newData]);

    setValue("country", null);
    setValue("state", null);
    setValue("city", null);

    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const getSelectStyles = (error, isFocused) => ({
    control: (provided) => ({
      ...provided,
      borderColor: error && !isFocused ? "red" : provided.borderColor,
      "&:hover": {
        borderColor:
          error && !isFocused ? "red" : provided["&:hover"].borderColor,
      },
      boxShadow: error && !isFocused ? "0 0 0 1px red" : provided.boxShadow,
    }),
  });

  const handleFocus = (field, ref) => {
    if (errors[field] && ref.current) {
      ref.current.focus();
      setFocusedField(field);
    }
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <>
      <div className="font-bold lg:text-4xl md:text-4xl text-xl text-center">
        <span className="text-red-500">C</span>
        <span className="text-yellow-500">o</span>
        <span className="text-green-500">u</span>
        <span className="text-blue-500">n</span>
        <span className="text-indigo-500">t</span>
        <span className="text-purple-500">r</span>
        <span className="text-pink-500">y</span>
        <span className="text-blue-500">,</span>
        <span className="text-red-500"> </span>
        <span className="text-yellow-500">S</span>
        <span className="text-green-500">t</span>
        <span className="text-blue-500">a</span>
        <span className="text-indigo-500">t</span>
        <span className="text-purple-500">e</span>
        <span className="text-pink-500"> </span>
        <span className="text-red-500">a</span>
        <span className="text-yellow-500">n</span>
        <span className="text-green-500">d</span>
        <span className="text-blue-500"> </span>
        <span className="text-indigo-500">C</span>
        <span className="text-purple-500">i</span>
        <span className="text-pink-500">t</span>
        <span className="text-red-500">y</span>
        <span className="text-yellow-500"> </span>
        <span className="text-green-500">S</span>
        <span className="text-blue-500">e</span>
        <span className="text-indigo-500">l</span>
        <span className="text-purple-500">e</span>
        <span className="text-pink-500">c</span>
        <span className="text-red-500">t</span>
        <span className="text-yellow-500">o</span>
        <span className="text-green-500">r</span>
      </div>

      <div className="ml-2">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-5">
          <div className="flex flex-col md:flex-row items-start mb-5 mt-5">
            <label
              htmlFor=""
              className="flex-shrink-0 mr-4 md:mr-8"
              style={{ minWidth: "120px" }}
            >
              Country <span className="text-red-500">*</span>
            </label>
            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center lg:mt-0 md:mt-0 mt-2">
              <Controller
                name="country"
                control={control}
                rules={{ required: "Please select a country." }}
                render={({ field }) => (
                  <div className="w-full md:w-auto">
                    <Select
                      placeholder="Select your country"
                      {...field}
                      value={selectedCountry}
                      onChange={(selectedOption) => {
                        handleCountryChange(selectedOption);
                        field.onChange(selectedOption);
                      }}
                      onFocus={() => handleFocus("country", countryRef)}
                      onBlur={handleBlur}
                      options={countriesData.map((country) => ({
                        value: country.name,
                        label: country.name,
                      }))}
                      styles={getSelectStyles(
                        errors.country,
                        focusedField === "country"
                      )}
                      className="w-80 md:w-96 lg:w-96"
                      ref={countryRef}
                    />
                  </div>
                )}
              />
              {errors.country && (
                <p className="text-red-500 mt-2 md:mt-0 lg:mt-0 lg:absolute lg:ml-[400px] md:ml-4">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start mb-5">
            <label
              htmlFor=""
              className="flex-shrink-0 mr-4 md:mr-8"
              style={{ minWidth: "120px" }}
            >
              State <span className="text-red-500">*</span>
            </label>
            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center lg:mt-0 md:mt-0 mt-2">
              <Controller
                name="state"
                control={control}
                rules={{ required: "Please select a state." }}
                render={({ field }) => (
                  <div className="w-full md:w-auto">
                    <Select
                      placeholder="Select your state"
                      {...field}
                      value={selectedState}
                      onChange={(selectedOption) => {
                        handleStateChange(selectedOption);
                        field.onChange(selectedOption);
                      }}
                      onFocus={() => handleFocus("state", stateRef)}
                      onBlur={handleBlur}
                      options={[
                        { value: "N/A", label: "N/A" },
                        ...statesData.map((state) => ({
                          value: state.name,
                          label: state.name,
                        })),
                      ]}
                      styles={getSelectStyles(
                        errors.state,
                        focusedField === "state"
                      )}
                      className="w-80 md:w-96 lg:w-96"
                      ref={stateRef}
                    />
                  </div>
                )}
              />
              {errors.state && (
                <p className="text-red-500 mt-2 md:mt-0 lg:mt-0 lg:absolute lg:ml-[400px] md:ml-4">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start mb-5">
            <label
              htmlFor=""
              className="flex-shrink-0 mr-4 md:mr-8"
              style={{ minWidth: "120px" }}
            >
              City <span className="text-red-500">*</span>
            </label>
            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center lg:mt-0 md:mt-0 mt-2">
              <Controller
                name="city"
                control={control}
                rules={{ required: "Please select a city." }}
                render={({ field }) => (
                  <div className="w-full md:w-auto">
                    <Select
                      placeholder="Select your city"
                      {...field}
                      value={selectedCity}
                      onChange={(selectedOption) => {
                        handleCityChange(selectedOption);
                        field.onChange(selectedOption);
                      }}
                      onFocus={() => handleFocus("city", cityRef)}
                      onBlur={handleBlur}
                      options={[
                        { value: "N/A", label: "N/A" },
                        ...citiesData.map((city) => ({
                          value: city.name,
                          label: city.name,
                        })),
                      ]}
                      styles={getSelectStyles(
                        errors.city,
                        focusedField === "city"
                      )}
                      className="w-80 md:w-96 lg:w-96"
                      ref={cityRef}
                    />
                  </div>
                )}
              />
              {errors.city && (
                <p className="text-red-500 mt-2 md:mt-0 lg:mt-0 lg:absolute lg:ml-[400px] md:ml-4">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="border px-4 py-2 bg-sky-500 text-white rounded-lg w-32"
          >
            Save
          </button>
        </form>
        {selectedValues.length > 0 && (
          <div className="mt-5 overflow-x-auto">
            <table className="border-collapse border border-gray-400 min-w-full">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">
                    Sr. No.
                  </th>
                  <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">
                    Country
                  </th>
                  <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">
                    State
                  </th>
                  <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">
                    City
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedValues.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2 text-center font-bold">
                      {index + 1}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {item.country}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {item.state}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {item.city}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default CountryStateCitySelector;
