import React from "react"

import { SimpleInputError } from "src"

const message = "This is an error message"

describe("SimpleInputError", () => {
  it("should render an error message", () => {
    const wrapper = mount(
      <SimpleInputError
        message={message}
        position={"centerLeft"}
      />
    )
    expect(wrapper.find(SimpleInputError)).toHaveLength(1)
    expect(wrapper.find("div.SimpleInputError-Message").text()).toEqual(message)
  })
})
