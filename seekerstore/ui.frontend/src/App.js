import { Page, withModel } from '@adobe/aem-react-editable-components';
import {React} from 'react';
import configureStore from './store/configureStore';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';

// This component is the application entry point

const store = configureStore();
class App extends Page {
  
  componentDidMount(){
    !AuthoringUtils.isInEditor() && store.dispatch(loadUser());
  }
  render() {
    return (
      <div>
          {this.childComponents}
          {this.childPages}
      </div>
    );
  }
}

export default withModel(App);
