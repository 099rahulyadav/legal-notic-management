import "@testing-library/jest-dom";
import { jest } from "@jest/globals";
import "jest-fetch-mock";  

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
