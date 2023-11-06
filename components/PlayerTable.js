import { useEffect, useState } from "react";

import { userRetrieveAllAliasCall } from "@/utils/api/user-api";
import { updatePlayerAliasCall, playerLeaveTeamCall } from "@/utils/api/team-api";

import HoverIcon from "./HoverIcon";

import { useTheme } from "@mui/styles";
import { Box, Typography } from "@mui/material";
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
import Stars from "@mui/icons-material/Stars";

export default function PlayerTable({ user, team, isOwner }) {
  const [editPlayerAlias, setEditPlayerAlias] = useState(false);
  const [editPlayerAliasId, setEditPlayerAliasId] = useState(null);
  const players = team.players;

  const theme = useTheme();

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
          await userRetrieveAllAliasCall(player.user.id, team.game.id)
              .then(data => {
                  setAliasList(data.aliases)
              })
      }

      retrieveAliases();
    }, [player.user.id])

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
                    aliasList.map(alias => <MenuItem key={alias.id} value={alias.id}>{alias.alias}</MenuItem>)
                }
                </Select>
            <HoverIcon icon={<CheckIcon />} onClick={() => onUpdateAliasHandler()}/>
        </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 655 }} size="small" aria-label="player table">
        <TableHead sx={{ backgroundColor: theme.palette.primary.main}}>
          <TableRow>
            <TableCell sx={{ color: theme.palette.white }}>Account</TableCell>
            <TableCell sx={{ color: theme.palette.white }}align="right">Alias</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.length <= 0 && <TableRow><Typography sx={{marginLeft: 2, padding: 1}}>No players on roster...</Typography></TableRow>}
          {players.map((player) => (
            <TableRow
              key={player.user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <p>{player.user.username}</p>
                  {player.user.id == team.ownerId && <Stars fontSize="5"/>}
                </Box>
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