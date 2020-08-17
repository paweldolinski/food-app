import React from "react";
import { mount } from "enzyme";

// ensure you're resetting modules before each test
beforeEach(() => {
  jest.resetModules();
});

// Takes the context data we want to test, or uses defaults
const getSearchFormrWithContext = (context = { search: "qwe" }) => {
  // Will then mock the LocalizeContext module being used in our LanguageSelector component
  jest.doMock("../context/RecipesContext.js", () => {
    return {
      RecipesContext: {
        Consumer: (props) => props.children(context),
      },
    };
  });

  // you need to re-require after calling jest.doMock.
  // return the updated LanguageSelector module that now includes the mocked context
  return require("../components/searchForm/SearchForm").SearchForm;
};

describe("<SearchForm />", () => {
  it("should return default search value", () => {
    // This will use the default context param since we pass nothing
    const SearchForm = getSearchFormrWithContext();
    const wrapper = mount(<SearchForm />);
    expect(wrapper.find("input").instance()).value = "";
  });

  // it('should render no languages', () => {
  //   // Here we override the context with the values we want for this specific test
  //   const LanguageSelector = getSearchFormrWithContext({ languages: [], activeLanguage: null });
  //   const wrapper = mount(<LanguageSelector />);
  //   expect(wrapper.find('li').length).toBe(0);
  // });
});
