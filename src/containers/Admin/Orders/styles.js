import styled from "styled-components";
import Select from 'react-select'


export const ProductImage = styled.img`
    height:80px;
    padding: 12px;
    border-radius: 50%;
`

export const SelectStatus = styled(Select)`
    width: 240px;
    margin: 0 auto;
`
export const Filter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 28px 0;
    gap: 50px;
`

export const FilterOption = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) => props.$isActiveStatus ? props.theme.purple : props.theme.darkGray };

    border-bottom: ${(props) => props.$isActiveStatus ? `2px solid ${props.theme.purple}`: 'none'};
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 5px;
`