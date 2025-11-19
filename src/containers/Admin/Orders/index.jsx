import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import {api} from '../../../services/api';
import { useEffect, useState } from 'react';
import {OrderStatusOptions} from './orderStatus';
import { Filter, FilterOption } from './styles';



export function Orders() {

    const [orders, setOrders] = useState([]) 
    const [filteredOrders, setfilteredOrders] = useState([]) 
    const [activeStatus, setActiveStatus] = useState(0) 

    const [rows, setRows] = useState([])

    
    useEffect(() => {

        async function LoadOrders(){
            const {data} = await api.get('/orders')

            setOrders(data)
            setfilteredOrders(data)

           
        }


        LoadOrders()
    }, [])


    
    function createData(orders) {

        return {
            name: orders.user.name,
            orderId: orders._id,
            date: orders.createdAt,
            status: orders.status,
            products: orders.products,

        };
    }

    
    useEffect(() => {
        const newRows = filteredOrders.map(order => createData(order));

        setRows(newRows);
    }, [filteredOrders])

    function handleStatus(status) {
        if (status.id === 0) {
            setfilteredOrders(orders)
        }else{
            const newOrders =  orders.filter(order => order.status === status.value);

            setfilteredOrders(newOrders)
        }

        setActiveStatus(status.id) 

    }

    
    useEffect(() => {
        if (activeStatus === 0){
            setfilteredOrders(orders);
        }else{
            const statusIndex = OrderStatusOptions.findIndex ((item) => item.id === activeStatus )

            
            const newFiltredOrders =  orders.filter(
                (order) => order.status === OrderStatusOptions[statusIndex].value 
            )

            console.log(newFiltredOrders);
            setfilteredOrders(newFiltredOrders)
        }
    }, [orders])
    


    return (
        <>
            <Filter>
                {OrderStatusOptions.map((status) => (
                    <FilterOption 
                    key={status.id}
                    onClick={()=> handleStatus(status)}
                    $isActiveStatus={activeStatus === status.id} 
                    >
                    {status.label}
                    
                    </FilterOption>
                ))}
            </Filter>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedidos</TableCell>
                            <TableCell>cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row 
                            key={row.orderId} 
                            row={row}
                            orders={orders}
                            setOrders={setOrders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}