import { useEffect, useState } from "react";

import { userRetrieveAllAliasCall } from "@/utils/api/user-api";
import { updatePlayerAliasCall, playerLeaveTeamCall } from "@/utils/api/team-api";

import HoverIcon from "./HoverIcon";

import { Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';

export default function PlayerTable({ user, players, isOwner }) {
  const [editPlayerAlias, setEditPlayerAlias] = useState(false);
  const [editPlayerAliasId, setEditPlayerAliasId] = useState(null);

  const onPlayerLeaveHandler = async (playerId) => {
    await playerLeaveTeamCall(playerId)
    .then(data => {
      if (data)
        location.reload()
    })
  }

  const PlayerAliasDropdown = ({ player }) => {
    const [aliasId, setAliasId] = useState(player.alias.id);
    const [aliasList, setAliasList] = useState([])

    useEffect(() => {
      async function retrieveAliases() {
          await userRetrieveAllAliasCall(player.user.id)
              .then(data => {
                  setAliasList(data.aliases)
              })
      }

      retrieveAliases();
    }, [])

    const onUpdateAliasHandler = async () => {
      if (aliasId == player.alias.id) {
        setEditPlayerAlias(false)
        return;
      }

      await updatePlayerAliasCall(player.id, aliasId)
        .then(data => {
          if (data)
            location.reload();
        })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={aliasId}
                label="Alias"
                onChange={(e) => setAliasId(e.target.value)}
                >
                {
                    aliasList.map(alias => <MenuItem value={alias.id}>{alias.alias}</MenuItem>)
                }
                </Select>
            <HoverIcon icon={<CheckIcon />} onClick={() => onUpdateAliasHandler()}/>
        </Box>
    )
  }

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 655 }} size="small" aria-label="player table">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Alias</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.user.username}
              </TableCell>
              <TableCell align="right">
                { editPlayerAlias && editPlayerAliasId == player.id ?
                  <PlayerAliasDropdown player={player}/>
                  :
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                      <p>{player.alias.alias}</p>
                      {(user && user.id == player.user.id || isOwner) &&
                      <>
                        <HoverIcon icon={<EditIcon />} onClick={() => { setEditPlayerAliasId(player.id); setEditPlayerAlias(true); }} />
                        <HoverIcon icon={<UndoIcon />} onClick={() => onPlayerLeaveHandler(player.id)} />
                      </>
                      }
                  </Box>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}