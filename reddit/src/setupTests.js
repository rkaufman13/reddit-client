import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";

require("jest-fetch-mock").enableMocks();
jest.spyOn(console, "log").mockImplementation();
