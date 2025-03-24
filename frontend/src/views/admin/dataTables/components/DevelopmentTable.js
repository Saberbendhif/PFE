'use client'; 
/* eslint-disable */

import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Input,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

const columnHelper = createColumnHelper();

export default function ComplexTable() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  useEffect(() => {
    fetch('http://localhost:4000/api/auth/users')
      .then((res) => res.json())
      .then((users) => {
        console.log('Données récupérées :', users); // Affiche les utilisateurs récupérés
        setData(users);
      })
      .catch((error) => console.error('Erreur lors de la récupération des utilisateurs', error));
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user._id); // Utilisation de _id au lieu de id
    setEditedUser(user);
  };

  const handleSave = (id) => {
    fetch(`http://localhost:4000/api/auth/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedUser),
    })
      .then(() => {
        setData(data.map((user) => (user._id === id ? editedUser : user))); // Utilisation de _id
        setEditingUser(null);
      })
      .catch((error) => console.error('Erreur lors de la mise à jour', error));
  };

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      fetch(`http://localhost:4000/api/auth/users/${id}`, { method: 'DELETE' })
        .then(() => setData(data.filter((user) => user._id !== id))) // Utilisation de _id
        .catch((error) => console.error('Erreur lors de la suppression', error));
    }
  };

  const columns = [
    columnHelper.accessor('name', {
      header: 'Nom',
      cell: (info) =>
        editingUser === info.row.original._id ? (
          <Input
            value={editedUser.name || ''}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
        ) : (
          <Text>{info.getValue()}</Text>
        ),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) =>
        editingUser === info.row.original._id ? (
          <Input
            value={editedUser.email || ''}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          />
        ) : (
          <Text>{info.getValue()}</Text>
        ),
    }),
    columnHelper.accessor('role', {
      header: 'Rôle',
      cell: (info) =>
        editingUser === info.row.original._id ? (
          <Input
            value={editedUser.role || ''}
            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
          />
        ) : (
          <Text>{info.getValue()}</Text>
        ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const user = info.row.original;
        return (
          <Flex gap={2}>
            {editingUser === user._id ? (
              <Button colorScheme="green" onClick={() => handleSave(user._id)}>
                Sauvegarder
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={() => handleEdit(user)}>
                Modifier
              </Button>
            )}
            <Button colorScheme="red" onClick={() => handleDelete(user._id)}>
              Supprimer
            </Button>
          </Flex>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card w="70vw" px="0px" overflowX="auto">
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700">
          Utilisateurs
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} borderColor={borderColor}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id} borderColor="transparent">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}