import { Button, TextInput } from 'flowbite-react';
import TableComp from '../../components/TableComp';
import {GoSearch} from 'react-icons/go'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../dtos/contant';

export default function Appointment() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate()

  function handleSearch(e: { target:{value:string}}) {
    setSearch(e.target.value)
  }
  return (
		<section className=" h-screen w-full ">
			<article className="h-full mt-16 pt-10 px-6 w-full">
				<div className="py-6 flex justify-between items-center">
					<TextInput
						icon={GoSearch}
            sizing="lg"
            value={search}
            className='w-[80%]'
						placeholder="search"
						type="email"
						onChange={handleSearch}
          />
          <Button className='bg-primary-dark' size='lg' onClick={()=> navigate(ROUTE.Appointments_Create)}>
            Book appointments
          </Button>
        </div>
        <div>

        </div>
        <div className='mt-6'>

				<TableComp />
        </div>
			</article>
		</section>
	);
}
