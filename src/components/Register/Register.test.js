import React from "react";
import {
  render,
  fireEvent,
  screen,
  getByTestId,
  container,
} from "@testing-library/react";
import Register from "./Register";
import { StateContext } from "../../config/globalState";
import { server, rest } from "../../test/server";

import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter, Route } from "react-router-dom";
import Home from "../Home/Home";

const store = {
  classes: [],
  members: [],
  photos: [],
  LoggedInUser: {},
  errorMessage: null,
  fileState: {
    success: false,
    url: "",
    description: "",
    file: {},
    selectedFile: "",
    type: "",
  },
};
const renderComponent = () => {
  render(
    <StateContext.Provider value={{ store }}>
      <BrowserRouter>
        <Register />

        {/* user is redirected to home page after successfully creating the user, therefore home component is passed below  */}
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </StateContext.Provider>
  );
};

describe("Register component renders as expected", () => {
  // !beforeEach render the Register before every test
  beforeEach(() => {
    render(
      <StateContext.Provider value={{ store }}>
        <Register />
      </StateContext.Provider>
    );
  });
  test("Should render 'Create Account' heading ", () => {
    screen.getByText(/create account/i).toBeInTheDocument;
  });
  test("should render ' Full Name' label", () => {
    screen.getByText(/full name/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your full name...").toBeInTheDocument;
  });
  test("should render 'Address' label", () => {
    screen.getByTestId("address").toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your address...").toBeInTheDocument;
  });
  test("should render 'Email' label", () => {
    screen.getByText(/email address/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your email...").toBeInTheDocument;
  });
  test("should render 'Password' label", () => {
    screen.getByText(/password/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your password...").toBeInTheDocument;
  });
  // ! all methods starting with query does not throw error but it is very useful for checking negative outcome using expect with it as it returns null in such cases
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  });
  test("should select input elements by their role", () => {
    expect(screen.getAllByRole("textbox").length).toEqual(4);
  });
  test("all text boxes should have required attribute", () => {
    expect(screen.getAllByRole("textbox")).toBeRequired;
  });
  test("should render input box for email", () => {
    screen.getByTestId("email").toBeInTheDocument;
  });
  test("email field should be required", () => {
    expect(screen.getByTestId("email")).toBeRequired;
  });
  test("should select 'back' button by it's role", () => {
    screen.getByRole("button", { name: /back/i });
  });
  test("should select 'create account' button by it's role", () => {
    screen.getByRole("button", { name: /submit/i });
  });
});
//  ! reference taken from: https://www.npmjs.com/package/@testing-library/react
describe("Register component creates a user as expected", () => {
  //! establish API mocking before all tests
  // beforeAll(() => server.listen());
  // //! reset any request handlers that are declared as a part of our tests
  // afterEach(() => server.resetHandlers());
  // //! clean up once the tests are done
  // afterAll(() => server.close());

  // render(
  //   <StateContext.Provider value="">
  //     <BrowserRouter>
  //       <Register />

  //       {/* user is redirected to home page after successfully creating the user, therefore home component is passed below  */}
  //       <Route exact path="/" component={Home} />
  //     </BrowserRouter>
  //   </StateContext.Provider>
  // );

  test("on click 'Create Account' button, Register component should create a new user and redirect to home page ", async () => {
    // const { getByTestId, container } = render(<App />);
    // const signUpLink = getByTestId("register");
    // fireEvent.click(signUpLink);
    //! fill out the form for testing
    renderComponent();

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "vipul" },
    });
    fireEvent.change(screen.getByTestId("address"), {
      target: { value: "123 fake street, Melbourne" },
    });
    fireEvent.change(screen.getByTestId("phone"), {
      target: { value: "0999999999" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "vipul@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    const button = screen.getByRole("button", { name: /create account/i });
    fireEvent.click(button);

    //   // !if user is redirected to home page, that implies that user has been successfully created

    // expect(await container).toHaveTextContent(/Home/);
    //   expect(await screen.findByText(/home/i)).toBeInTheDocument();
    expect(await screen.getByRole("heading", { name: /home/i }));
  });
  // test.only("should display server error if request fails", async () => {
  //   const testErrorMessage =
  //     "Authentication failed, please check user name and password";
  //   console.log("inside server.use=>");
  //   server.use(
  //     rest.post("/users", async (req, res, ctx) => {
  //       return res(
  //         ctx.status(409),
  //         ctx.json({ errorMessage: testErrorMessage })
  //       );
  //     })
  //   );
  //   // renderComponent();
  //   render(
  //     <StateContext.Provider value={""}>
  //       <Register />
  //     </StateContext.Provider>
  //   );
  //   fireEvent.change(screen.getByTestId("name"), {
  //     target: { value: "vipul" },
  //   });
  //   fireEvent.change(screen.getByTestId("address"), {
  //     target: { value: "123 fake street, Melbourne" },
  //   });
  //   fireEvent.change(screen.getByTestId("phone"), {
  //     target: { value: "0999999999" },
  //   });
  //   fireEvent.change(screen.getByTestId("email"), {
  //     target: { value: "vipul@test.com" },
  //   });
  //   fireEvent.change(screen.getByTestId("password"), {
  //     target: { value: "123456" },
  //   });
  //   const button = screen.getByRole("button", { name: /create account/i });
  //   fireEvent.click(button);
  //   expect(await screen.getByTestId("errorMessage")).toHaveTextContent(
  //     testErrorMessage
  //   );
  // expect(
  //   await screen.getByText(
  //     /there may be a problem with the server please try later/i
  //   )
  // );
  // });

  // expect(heading).toHaveTextContent(/welcome/i);

  // ctonsole.log("container=>", container);
  // expect(container).toHaveTextContent(/Welcome vipul/);
  // await waitFor(() => screen.getByRole("heading"));
  // expect(screen.getByRole("heading")).toHaveTextContent("Welcome vipul");
  // });
  // test("should handle server error", async () => {
  // server.use(
  //   rest.post("/users", (req, res, ctx) => {
  //     return res(
  //       ctx.status(409),
  //       ctx.json({
  //         error: "Authentication failed, please check user name and password",
  //       })
  //     );
  //   })
  // );
  // const { container } = render(
  //   <StateContext.Provider value="">
  //     <Register />
  //   </StateContext.Provider>
  // );

  // fireEvent.click(signUpLink);
  // //! fill out the form for testing
  // fireEvent.change(screen.getByTestId("name"), {
  //   target: { value: "vipul" },
  // });
  // fireEvent.change(screen.getByTestId("address"), {
  //   target: { value: "123 fake street, Melbourne" },
  // });
  // fireEvent.change(screen.getByTestId("phone"), {
  //   target: { value: "0999999999" },
  // });
  // fireEvent.change(screen.getByTestId("email"), {
  //   target: { value: "vipul@test.com" },
  // });
  // fireEvent.change(screen.getByTestId("password"), {
  //   target: { value: "123456" },
  // });

  // // const button = screen.getByRole("button", { name: /create account/i });
  // fireEvent.click(button);
  // const error = await screen.getByText("error");
  // expect(error).toHaveTextContent(
  //   /Authentication failed, please check user name and password/i
  // );
  // expect(container).toHaveTextContent(
  //   /Authentication failed, please check user name and password/i
  // );
});
// expect(container).toHaveTextContent(/Home/);

// describe("new test", () => {
//   // const fakeData = { user: { name: "vipul" } };

//   // //  !declare which API requests to mock
//   const server = setupServer(
//     // !capture "POST /users request"
//     rest.post("/users", (req, res, ctx) => {
//       // ! getting back response using mocked json body
//       // return res(ctx.json(fakeData));
//       return res(
//         ctx.status(500),
//         ctx.json({ errorMessage: "Not authenticated" })
//       );
//     })
//   );
//   //! establish API mocking before all tests
//   beforeAll(() => server.listen());
//   // //! reset any request handlers that are declared as a part of our tests
//   afterEach(() => server.resetHandlers());
//   // //! clean up once the tests are done
//   afterAll(() => server.close());

//   test.only("negative ", async () => {
//     const { container, getByTestId, queryByTestId } = render(
//       <StateContext.Provider value="">
//         {/* <BrowserRouter> */}
//         <Register />

//         {/* user is redirected to home page after successfully creating the user, therefore home component is passed below  */}
//         {/* <Route exact path="/" component={Home} /> */}
//         {/* </BrowserRouter> */}
//       </StateContext.Provider>
//     );
//     // ! jest.mock is used to mock the result of any api call,
//     // jest.mock("../../");

//     const handleSubmit = jest.fn();
//     // registerUser = jest.fn;
//     // const { getByTestId, container } = render(<App />);
//     // const signUpLink = getByTestId("register");
//     // fireEvent.click(signUpLink);
//     //! fill out the form for testing
//     fireEvent.change(getByTestId("name"), {
//       target: { value: "vipul" },
//     });
//     fireEvent.change(getByTestId("address"), {
//       target: { value: "123 fake street, Melbourne" },
//     });
//     fireEvent.change(getByTestId("phone"), {
//       target: { value: "0999999999" },
//     });
//     fireEvent.change(getByTestId("email"), {
//       target: { value: "vipul@test.com" },
//     });
//     fireEvent.change(getByTestId("password"), {
//       target: { value: "123456" },
//     });

//     const button = screen.getByRole("button", { name: /create account/i });
//     // console.log("button=>", button);
//     fireEvent.click(button);
//     // await waitFor(() => screen.getByTestId("errorMessage"));
//     expect(handleSubmit()).toHaveBeenCalledTimes(1);
//     const errorMessage = await queryByTestId("errorMessage");
//     console.log("errormessage=>", errorMessage);
//     // await expect(queryByTestId("errorMessage")).value.toEqual(
//     // "Not authenticated"
//     // );
//     // await expect(screen.getByText(/"Not authenticated"/i));
//     // await expect(registerUser()).rejects.toThrow("400");
//     // await waitFor(() => expect(registerUser()).rejects.toThrow());
//     // expect(window.fetch).toHaveBeenCalledTimes(1)
//     // screen.debug();
//     // const heading = await screen.getByRole("heading");
//     // !if user is redirected to home page, that implies that user has been successfully created
//     // screen.getByText(
//     //   /authentication failed, please check user name and password/i
//     // );
//     // expect(container).toHaveTextContent(/Home/);
//     // expect(heading).toHaveTextContent(/welcome/i);

//     // ctonsole.log("container=>", container);
//     // expect(container).toHaveTextContent(/Welcome vipul/);
//     // await waitFor(() => screen.getByRole("heading"));
//     // expect(screen.getByRole("heading")).toHaveTextContent("Welcome vipul");
//     // });
//     // test("should handle server error", async () => {
//     // server.use(
//     //   rest.post("/users", (req, res, ctx) => {
//     //     return res(
//     //       ctx.status(409),
//     //       ctx.json({
//     //         error: "Authentication failed, please check user name and password",
//     //       })
//     //     );
//     //   })
//     // );
//     // const { container } = render(
//     //   <StateContext.Provider value="">
//     //     <Register />
//     //   </StateContext.Provider>
//     // );

//     // fireEvent.click(signUpLink);
//     // //! fill out the form for testing
//     // fireEvent.change(screen.getByTestId("name"), {
//     //   target: { value: "vipul" },
//     // });
//     // fireEvent.change(screen.getByTestId("address"), {
//     //   target: { value: "123 fake street, Melbourne" },
//     // });
//     // fireEvent.change(screen.getByTestId("phone"), {
//     //   target: { value: "0999999999" },
//     // });
//     // fireEvent.change(screen.getByTestId("email"), {
//     //   target: { value: "vipul@test.com" },
//     // });
//     // fireEvent.change(screen.getByTestId("password"), {
//     //   target: { value: "123456" },
//     // });

//     // const button = screen.getByRole("button", { name: /create account/i });
//     // fireEvent.click(button);
//     // const error = await screen.getByText("error");
//     // expect(error).toHaveTextContent(
//     //   /Authentication failed, please check user name and password/i
//     // );
//     // expect(container).toHaveTextContent(
//     //   /Authentication failed, please check user name and password/i
//     // );
//   });
// });
// expect(container).toHaveTextContent(/Home/);
