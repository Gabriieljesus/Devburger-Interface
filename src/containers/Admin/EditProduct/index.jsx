import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react/dist/ssr"
import { Container, InputGroup, Label, LabelUpload, Input ,Select,SubmitButton, Form, ErrorMessage, ContainerCheckbox } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../../services/api"
import { toast } from "react-toastify"
import { useLocation, useNavigate } from "react-router-dom"


const schema = yup
    .object({
        name: yup.string().required('Digite o nome do produto'),
        price: yup.number().positive().required('digite o preço do produto').typeError('Digite o preço do produto'),
        categoty: yup.object().required('Selecione uma categoria'),
        offer: yup.boolean(),

    });

export function EditProduct() {

    const [fileName, setFileName] = useState(null)
    const [categories, setcategories] = useState('')

    const navigate = useNavigate()

    const {state} = useLocation() 
    const {state: {produto}}= useLocation() 
    

  
    useEffect(() => {

        async function loadCategories(){
            const {data} = await api.get('/categories')

            
            setcategories(data)
        }

        loadCategories()

    }, [])

 
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        const newFormData =  new FormData()

        newFormData.append('name', data.name)
        newFormData.append('price', data.price * 100)
        newFormData.append('category_id', data.categoty.id)
        newFormData.append('file', data.file[0])
        newFormData.append('offer', data.offer)

        await toast.promise(api.put(`/products/${produto.id}`, newFormData),{
            pending: 'Editando produto...',
            success: 'Produto editado com sucesso!',
            error: 'Erro ao editar produto'
        })

       
        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000)
    }

    return (
        <>  
            <Container>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <Label>
                            Nome
                        </Label>
                        <Input type="text" {...register("name")} defaultValue={produto.name} />
                        
                        <ErrorMessage>{errors.name?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <Label>
                            Preço
                        </Label>
                        <Input type="number" {...register("price") } defaultValue={produto.price /100}/>
                        <ErrorMessage>{errors.price?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <LabelUpload>
                            <Image /> 
                            <input 
                            type="file"
                            {...register("file")}
                            accept="image/png, image/jpeg, image/jpg" 
                           
                            onChange={(value) =>{
                                setFileName(value?.target?.files[0]?.name) 
                                register('file').onChange(value) 
                            }}
                            />
                            {fileName || 'Upload do Produto'}
                        </LabelUpload>

                        <ErrorMessage>{errors.file?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <Label>
                            Categoria
                        </Label>

                        <Controller 
                            name='categoty'
                            control={control} 
                            defaultValue={produto.category} 

                            render={({field})=> (   
                            <Select 
                                {...field} 
                                
                                options={categories}
                                getOptionLabel={categories => categories.name} 
                                getOptionValue={categories => categories.id}
                                placeholder="Selecione uma categoria"
                                menuPortalTarget={document.body} 
                                defaultValue={produto.category}
                            />

                        )}/>
                        <ErrorMessage>{errors.categoty?.message}</ErrorMessage>
                    </InputGroup>

                    <InputGroup>
                        <ContainerCheckbox>
                            <input type="checkbox" {...register("offer")} defaultChecked={produto.offer} />
                            <Label>Produto em Oferta ? </Label>
                        </ContainerCheckbox>
                    </InputGroup>

                    <SubmitButton type="submit">Editar Produto</SubmitButton>
                </Form>

            </Container>
        </>
    )

}