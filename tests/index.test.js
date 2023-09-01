import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import TopNavbar from "@/components/TopNavbar";
import { SessionProvider } from "next-auth/react";

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" }
    };
    return {
      __esModule: true,
      ...originalModule,
      useSession: jest.fn(() => {
        return { data: mockSession, status: 'authenticated' }  // return type is [] in v3 but changed to {} in v4
      }),   
    };
});

describe("Navbar Component", () => {

    it('Show Log Out when has session',
      async () => {
        const { container } = render(<TopNavbar/>);
  
        expect(screen.getByText("Sign Out")).toBeInTheDocument();
      })
  
  })