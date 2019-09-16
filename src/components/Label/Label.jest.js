import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';

import Label from './Label';


describe('Label', () => {
  const labelText = 'labeled';

  it('contains the top-level class name', () => {
    const wrapper = shallow(<Label>{labelText}</Label>);

    assert(wrapper.hasClass('Label2'));
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correct label text', () => {
    const wrapper = shallow(<Label>{labelText}</Label>);
    const renderedLabelText = wrapper.text();

    assert.equal(renderedLabelText, labelText);
    expect(wrapper).toMatchSnapshot();
  });

  it('can be set as a ribbon', () => {
    const wrapper = shallow(<Label ribbon>{labelText}</Label>);

    assert(wrapper.hasClass('Label--ribbon'));
    expect(wrapper).toMatchSnapshot();
  });

  it('can be set as right-positioned', () => {
    const wrapper = shallow(<Label right>{labelText}</Label>);

    assert(wrapper.hasClass('Label--right'));
    expect(wrapper).toMatchSnapshot();
  });

  describe('setting different colors', () => {
    it('can be blue', () => {
      const wrapper = shallow(<Label color="blue">{labelText}</Label>);

      assert(wrapper.hasClass('Label--blue'));
      expect(wrapper).toMatchSnapshot();
    });

    it('can be green', () => {
      const wrapper = shallow(<Label color="green">{labelText}</Label>);

      assert(wrapper.hasClass('Label--green'));
      expect(wrapper).toMatchSnapshot();
    });

    it('can be indigo', () => {
      const wrapper = shallow(<Label color="indigo">{labelText}</Label>);

      assert(wrapper.hasClass('Label--indigo'));
      expect(wrapper).toMatchSnapshot();
    });

    it('can be orange', () => {
      const wrapper = shallow(<Label color="orange">{labelText}</Label>);

      assert(wrapper.hasClass('Label--orange'));
      expect(wrapper).toMatchSnapshot();
    });

    it('can be red', () => {
      const wrapper = shallow(<Label color="red">{labelText}</Label>);

      assert(wrapper.hasClass('Label--red'));
      expect(wrapper).toMatchSnapshot();
    });

    it('can be steel', () => {
      const wrapper = shallow(<Label color="steel">{labelText}</Label>);

      assert(wrapper.hasClass('Label--steel'));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
