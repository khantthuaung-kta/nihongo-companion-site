import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import LandingPage from "./LandingPage";

const apiGet = vi.hoisted(() => vi.fn());
vi.mock("../services/api", () => ({ apiGet }));

describe("LandingPage smoke test", () => {
  beforeEach(() => {
    apiGet.mockReset();
  });

  it("renders and shows backend health", async () => {
    apiGet.mockResolvedValue({
      status: "ok",
      app: "Nihongo Companion",
      version: "0.1.0",
      environment: "test",
    });

    render(<LandingPage />);

    expect(
      await screen.findByText(/Learn Japanese vocabulary with Burmese translations/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ok")).toBeInTheDocument();
    });
  });
});