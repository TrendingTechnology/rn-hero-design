import { connect } from 'react-redux';
import themeManager from './themeManager';

export default connect((state, ownProps) => ({
  theme: ownProps.theme || themeManager.getTheme(state.__theme),
}));
