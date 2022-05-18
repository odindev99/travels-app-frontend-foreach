import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Button,
} from "@chakra-ui/react";
import formatDate from "../../utils/formatDate";

const TravelsTable = ({ onOpen, travels }) => {
	return (
		<div className="max-width">
			<div className="mb-6">
				<h2 className="font-bold text-xl mb-4">Tus Viajes</h2>

				<Button size="sm" colorScheme="blue" onClick={onOpen}>
					Añadir viaje
				</Button>
			</div>

			<TableContainer>
				<Table variant="striped">
					<TableCaption>Viajes</TableCaption>
					<Thead bg="app.terciary">
						<Th color="white">Nro. de Viaje</Th>
						<Th color="white">Día y Hora</Th>
						<Th color="white">Punto de Inicio</Th>
						<Th color="white">Punto de Termino</Th>
						<Th color="white">Kilómetros Recorridos</Th>
						<Th color="white">Medio de Transporte</Th>
						<Th color="white">Personas en el Viaje</Th>
						<Th color="white">Ida y Vuelta</Th>
						<Th color="white">KgCO2 por persona</Th>
					</Thead>
					<Tbody>
						{travels.map((travel, i) => (
							<Tr>
								<Td>{i + 1}</Td>
								<Td>{formatDate(travel.createdAt)}</Td>
								<Td>{travel.startpoint}</Td>
								<Td>{travel.endpoint}</Td>
								<Td>{travel.kilometres}</Td>
								<Td>{travel.transport}</Td>
								<Td>{travel.workers}</Td>
								<Td>{travel.roundtrip ? "VERDADERO" : "FALSO"}</Td>
								<Td>{travel.kgco2}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default TravelsTable;
