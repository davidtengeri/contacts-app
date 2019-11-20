import React from 'react';
import renderer from 'react-test-renderer';

import ContactModal from './ContactModal';

jest.useFakeTimers();

describe('<ContactModal />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ContactModal
      visible
      search=""
      contacts={[
        {
          name: 'John Doe',
          id: 'XsdjA3a',
          phoneNumbers: [
            { number: '111 1111 111' }
          ]
        }
      ]}
      onCancel={() => { }}
      onSelect={() => { }}
      onSearch={() => { }}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
