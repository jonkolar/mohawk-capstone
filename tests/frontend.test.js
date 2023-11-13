import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import theme from "@/utils/theme";
import { ThemeProvider } from "@mui/styles";

import TopNavbar from "@/components/TopNavbar";

import Home from "@/pages";
import AccountChooseUsername from "@/pages/account/choose-username";
import UsersPage, { getServerSideProps as usersPageProps } from "@/pages/users/[username]";
import AccountTeams, { getServerSideProps as teamsPageProps} from "@/pages/account/teams";
import Admin, { getServerSideProps as adminPageProps } from "@/pages/admin";

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "test", admin: true }
    };
    return {
      __esModule: true,
      ...originalModule,
      useSession: jest.fn(() => {
        return { data: mockSession, status: 'authenticated' }  // return type is [] in v3 but changed to {} in v4
      }),   
    };
});

jest.mock("next-auth/next", () => {
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "test", id: 'test', status: 'authenticated', admin: true }
  };
  return {
    __esModule: true,
    getServerSession: jest.fn(() => {
      return mockSession  // return type is [] in v3 but changed to {} in v4
    }),   
  };
});

jest.mock("c:/Users/Spirks/Desktop/mohawk-capstone/pages/api/auth/[...nextauth]", () => {
  return {
    __esModule: true,  
  };
});

describe("Navbar Component", () => {
  test('Navbar renders properly',
    async () => {
      const { container } = render(<TopNavbar/>);

      expect(screen.getByText("Sign Out")).toBeInTheDocument();
    })
})

describe("Home Page", () => {
  test('Home page renders properly',
    async () => {
      // render
      render(<Home/>);

      // test
      expect(screen.getByText("MANAGE YOUR GAMING TEAMS")).toBeInTheDocument();
    })
})

describe("Choose Username Page", () => {
  test('Show home page site description',
    async () => {
      // render
      render(<ThemeProvider theme={theme}>
              <AccountChooseUsername />
             </ThemeProvider>);

      // test
      expect(screen.getByText("USERNAME SELECTION")).toBeInTheDocument();
    })
})

describe("User Profile Page", () => {
  test('User profile page renders properly',
    async () => {
      // prepare
      const reqresquery = {
        query: {
          username: "test"
        }
      }
      const { props } = await usersPageProps(reqresquery);

      // render
      render(<ThemeProvider theme={theme}>
              <UsersPage user={props.user} teams={props.teams}/>
             </ThemeProvider>);

      // test
      expect(screen.getByText("test (Your Profile)")).toBeInTheDocument();
    })
})

describe("Account Teams Page", () => {
  test('Show teams page renders properly',
    async () => {
      // prepare
      const reqresquery = {
        query: {
          username: "test"
        }
      }
      const { props } = await teamsPageProps(reqresquery);

      // render
      render(<ThemeProvider theme={theme}>
              <AccountTeams user={props.user} teams={props.teams} games={props.games}/>
             </ThemeProvider>);

      // test
      expect(screen.getByText("YOUR TEAMS")).toBeInTheDocument();
    })
})

describe("Admin page", () => {
  test('Admin page renders properly',
    async () => {
      // prepare
      const reqresquery = {
        query: {
          username: "test"
        }
      }
      const { props } = await adminPageProps(reqresquery);

      console.log(props)

      // render
      render(<ThemeProvider theme={theme}>
              <Admin user={props.user} data={props.data}/>
             </ThemeProvider>);

      // test
      expect(screen.getByText("Admin")).toBeInTheDocument();
    })
})