import { useState, useEffect } from "react";

import { userRetrieveAllAliasCall, userAcceptTeamInviteCall } from "@/utils/api/user-api";
import BasicModal from "./BasicModal";

import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function ChooseAliasModal({ open, setModal, user, invite }) {
    const [aliasId, setAliasId] = useState("");
    const [aliases, setAliases] = useState([])

    useEffect(() => {
        const retrieveAliases = async () => {
            const data = await userRetrieveAllAliasCall(user.id, invite ? invite.team.gameId : null );
            setAliases(data.aliases)
            setAliasId(data.aliases[0].id)
        }

        retrieveAliases()
        .catch(console.error)
    }, [invite])

    const handleClose = () => {

    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await userAcceptTeamInviteCall(invite.id, true, aliasId)
            .then(response => {
                setModal(false);
                location.replace("/teams/" + invite.teamId)
            })
        }

    return (
        <div>
            <BasicModal
                label="Choose Alias"
                open={open}
                setModal={setModal}
                onClose={handleClose}
            >
                {aliases.length <= 0 ? <Typography variant="h6">Please add an alias (on your profile page) for the game this team is competing in before accepting this invite.</Typography> 
                :
                <form method="POST" onSubmit={onSubmit}>
                    <FormControl>
                        <Select
                            labelId="alias-label"
                            id="alias"
                            value={aliasId}
                            onChange={(e) => { setAliasId(e.target.value) }}
                        >
                            {aliases.map((alias) =>
                                <MenuItem key={alias.id} value={alias.id}>{alias.game.name + ": " + alias.alias}</MenuItem>
                            )}
                        </Select>

                        <Button type="submit" variant="contained" sx={{mt: 2}}>Accept</Button>
                    </FormControl>
                </form>
                }
            </BasicModal>
        </div>
    );
}