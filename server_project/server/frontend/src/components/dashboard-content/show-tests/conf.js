import { getInProgressTests, publishTest } from "../../../actions/test";

const showContent = {
    supervisor: {
        title: 'Pruebas en desarrollo',
        initialValues: { 
            rows: 10,
            offset: 0
        },
        editRoute: '/show-test',
        action: getInProgressTests,
        publishAction: publishTest
    }
}


export default showContent;