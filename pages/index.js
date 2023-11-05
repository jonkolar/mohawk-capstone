import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";

import { useTheme } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AppsIcon from '@mui/icons-material/Apps';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import gamingController from "../public/gaming-controller.webp"

import IconList from "@/components/IconList";
import { Typography, Box } from "@mui/material";

export default function Home({  }) {
    const { data: session } = useSession()

    const theme = useTheme();
    
    return (
      <>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            gap: 10
          }}>
            <Box sx={{borderLeft: 4, borderColor: theme.palette.primary.main, paddingLeft: 2, paddingRight: 2}}>
              <Typography variant="h3" color="white">MANAGE YOUR GAMING TEAMS</Typography>
              <Typography variant="h3" color="white">START TODAY</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={{borderRadius: '50%'}}
                src={gamingController}
                height={250}
                width={250}
              />
              <IconList 
                items={[
                  {
                    icon: <PostAddIcon />,
                    label: "CREATE A LEGACY"
                  },
                  {
                    icon: <AppsIcon  />,
                    label: "MANAGE TEAMS"
                  },
                  {
                    icon: <ChatBubbleIcon />,
                    label: "POST UPDATES"
                  },
                  {
                    icon: <AutoAwesomeIcon />,
                    label: "CHALLENGE OTHERS"
                  },
                ]}
              />
            </Box>
          </Box>
      </>
    )
  }