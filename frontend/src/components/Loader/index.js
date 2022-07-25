import PropTypes from 'prop-types';

import { Overlay } from './styles';
import Spinner from '../Spinner';
import ReactPortal from '../ReacPortal';

export default function Loader({ isLoading }) {
    if (!isLoading) {
        return null;
    }

    return (
      <ReactPortal containerId="loader-root">
        <Overlay>
          <Spinner size={90} />
        </Overlay>
      </ReactPortal>
    );
}

Loader.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};
