import {render, screen} from "@testing-library/react"
import CheckBoxItem from "./CheckBoxItem"
afterEach(cleanup)
test("on initial render", () => {
    render(<CheckBoxItem />);
    const cbEl = screen.getByTestId("box1");
    expect(cbEl).toBeInTheDocument();
    
  });
 