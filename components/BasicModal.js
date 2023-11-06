import { useTheme } from "@mui/styles";

import HoverIcon from "./HoverIcon";

import CloseIcon from '@mui/icons-material/Close';
import { Typography, Modal, Box } from "@mui/material";

export default function BasicModal( { open, onClose, setModal, label="Modal", children }) {     
    const theme = useTheme();
    
     return (
       <Modal
        open={open}
        onClose={onClose}
       >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'clip'
            }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.palette.primary.main, 
                          padding: 1, borderRadius: theme.border.radius, margin: .25, paddingRight: 1, paddingRight: 2, paddingLeft: 2}}
                >
                    <Typography variant="h5" color={'white'}>{label}</Typography>
                    <HoverIcon icon={<CloseIcon sx={{color: theme.palette.white, marginTop: 0.5}} /> } onClick={() => setModal(false)}/>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', margin: 3}}>
                    {children}
                </Box>
            </Box>
       </Modal>
     )
   }