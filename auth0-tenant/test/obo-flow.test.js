/** @import {Event, PostLoginAPI} from "@auth0/actions/post-login/v3" */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { onExecutePostLogin } from "../auth0-tenant/actions/obo-flow/code.js";

describe("OBO Flow", () => {
  let _consoleMock;

  /** @type {Event} */
  let event;

  /** @type {PostLoginAPI} */
  let api;

  beforeEach(() => {
    // Spy on console.log to capture its output for assertions
    _consoleMock = vi.spyOn(console, "log").mockImplementation(() => {});

    // Mock Auth0 Event and API objects
    event = {
      transaction: {
        protocol: "",
        actor: "",
      },
    };

    api = {};
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should handle oauth2-token-exchange flow", async () => {
    // Prepare
    event.transaction.actor = "actor-id";
    event.transaction.protocol = "oauth2-token-exchange";

    // Act
    await onExecutePostLogin(event, api);
    // onContinuePostLogin is not called

    // Assert
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("actor-id");
  });

  it("Should no-op other flows", async () => {
    // Prepare
    event.transaction.protocol = "";

    // Act
    await onExecutePostLogin(event, api);
    // onContinuePostLogin is not called

    // Assert
    expect(console.log).not.toHaveBeenCalled();
  });
});
