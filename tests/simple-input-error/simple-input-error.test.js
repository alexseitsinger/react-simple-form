import React from "react"

import { SimpleInputError } from "src"

const message = "This is an error message"

describe("SimpleInputError", () => {
  it("should render an error when isVisible is true", () => {
    const wrapper = mount(
      <SimpleInputError
        isVisible={true}
        message={message}
        position={"centerLeft"}
      />
    )
    expect(wrapper.find(SimpleInputError)).toHaveLength(1)
    expect(wrapper.find("div.SimpleInputError-Message").text()).toEqual(message)
  })
  it("should render nothing when isVisible is false", () => {
    const wrapper = mount(
      <SimpleInputError
        isVisible={false}
        message={message}
        position={"centerLeft"}
      />
    )
    expect(wrapper.find("div.SimpleInputError")).toHaveLength(0)
  })
})
