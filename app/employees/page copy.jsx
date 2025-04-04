"use client"
import { useDispatch, useSelector} from 'react-redux';
import Button from '@app/UI components/Button';
import Container from '@app/UI components/Container';
import Card from '@app/UI components/Card';
import { getEmployeeData } from '@utils/apiEmployees';
import { useQuery} from '@node_modules/@tanstack/react-query';
import LoadingSpinner from '@app/UI components/LoadingSpinner';
import toast from '@node_modules/react-hot-toast/dist';
import { setOverlay } from '@app/UI components/Overlay/reduxSlice/overlayReducer';
import FormModel from './EmployeeFormModel';
import EmployeeTableModel from './EmployeeTableModel';

const Page = () => {
  let isOverlay = useSelector((store)=> store.overlay.overlay);

  //Now lets use the React Query to fetch data from supabase
    const {isLoading, data, error} =  useQuery({
      queryKey: ['employeeData'],
      queryFn: getEmployeeData
    });

    //functionality of displaying form field
    let dispatch = useDispatch();
    function handleCreate(){
      dispatch(setOverlay({overlay: true, fetchedFormData: false}));
    } 

   //If isLoading = then display the Spinner
   if(isLoading){
     return  <LoadingSpinner></LoadingSpinner>
   }
 

  return (
    <>
    { isOverlay && <FormModel></FormModel>}
    <Container width={"100%"}>
      <div className="headerText"> EMPLOYEES</div><div className="miniHeaderText">Company Employees</div>
    </Container>

    <Container height={"66vh"} width={"100%"} boxShadow={"5px 12px 30px rgb(138, 203, 241)"}>

      <Card padding={"0px 0px 10px 0px"} width={"50%"}>
        <button onClick={()=>toast.success("Awsome")}>
          <Button backgroundColor={"#d60404"} color={"white"} boxShadow={"5px 5px 10px rgb(138, 203, 241)"} 
          stateAction={""} margin={"0px 20px 0px 0px"}>
            Print PDF
          </Button>
        </button>
        <button>
          <Button backgroundColor={"#4b9c62"} color={"white"} boxShadow={"5px 5px 10px rgb(138, 203, 241)"} 
          stateAction={""}>
            Print Excel
          </Button>
        </button>
      </Card>

      <Card padding={"0px 0px 10px 0px"} width={"50%"} justifyContent={"flex-end"}>
        <button onClick={handleCreate}>
          <Button backgroundColor={"blue"} color={"white"} boxShadow={"5px 5px 10px rgb(138, 203, 241)"} >
            Create employee
          </Button>
        </button>
      </Card>
      
      <Card width={"100%"} boxShadow={"5px 12px 30px rgb(138, 203, 241)"} >
        <div style={{height: "52vh", width: "100%", overflow: "auto", padding: "16px 0px"}}>
          <section style={{height: "auto", width: "100%",}}>
          { /* Print data here */ }
            {
              data ? <EmployeeTableModel data={data}/> : <LoadingSpinner/>
            }
          </section>
        </div>
      </Card>

    </Container>
    </>
  );
};

export default Page;
