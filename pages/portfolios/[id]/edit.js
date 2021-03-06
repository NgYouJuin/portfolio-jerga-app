import BaseLayout from "components/layouts/BaseLayout"
import {useRouter} from "next/router"
import BasePage from "components/BasePage"
import withAuthHoc from 'hoc/withAuth'
import {useGetPortfolio} from 'actions/portfolios'
import PortfolioForm from "components/PortfolioForm";
import { Row, Col} from 'reactstrap';
import { useUpdatePortfolio } from "actions/portfolios";
import { toast } from 'react-toastify';


const PortfolioEdit  = ({user}) => {
    const router = useRouter();
    const [updatePortfolio, {data, error, loading}] = useUpdatePortfolio();
    const {data: initialData} = useGetPortfolio(router.query.id);

    const _updatePortfolio = async (data) => {
        try {
            await updatePortfolio(router.query.id, data)
            toast.success('Portfolio has been updated!' , {autoClose: 2000})
        } catch (e) {
            toast.error('Oops. Some Error' , {autoClose: 2000})
        }
        // updatePortfolio(router.query.id, data)
        // .then(() =>  toast.success('Portfolio has been updated!' , {autoClose: 2000}))
        // .catch(() => toast.error('Oops. Some Error' , {autoClose: 2000}))
    }

    return (
      <BaseLayout user={user} loading={false} >
            <BasePage header="Portfolio Edit">
                <Row>
                    <Col md="8">
                        { initialData && 
                            <PortfolioForm 
                            onSubmit={_updatePortfolio}
                            initialData={initialData}
                            />
                        }
                        {error && 
                            <div className="alert alert-danger mt-2">{error}</div>
                        }
                    </Col>
                </Row>
            </BasePage>
        </BaseLayout>
    )
}
  
export default withAuthHoc(PortfolioEdit)('admin');