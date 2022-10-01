import {render, screen, waitFor} from '@testing-library/react';
import ListElement from './ListElement';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ListElement', () => {
  
  it('Default values shown when not properties passed', () => {
    render(<Router><ListElement/></Router>);
    expect(screen.getByText("default title")).toBeVisible;
  });
  
  it('Title and Description shown', () => {
    const title = "Example test title";
    const description = "Example test description";
    render(<Router><ListElement title={title} description={description}/></Router>);
    expect(screen.getByText(title)).toBeVisible;
    expect(screen.getByText(description)).toBeVisible;
  });
  
  it('ImgSrc not passed', () => {
    render(<Router><ListElement/></Router>);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it('ImgSrc shown', () => {
    //TO DO: replace by a default image hosted in our service
    const imgSrcTest = "https://storage.needpix.com/rsynced_images/child-3003305_1280.jpg";
    render(<Router><ListElement imgSrc={imgSrcTest}/></Router>);
    expect(screen.queryByRole("img")).toBeTruthy();
  });

  it('withImage=false', () => {
    //TO DO: replace by a default image hosted in our service
    const imgSrcTest = "https://storage.needpix.com/rsynced_images/child-3003305_1280.jpg";
    render(<Router><ListElement imgSrc={imgSrcTest} withImage={false}/></Router>);
    expect(screen.queryByRole("img")).toBeFalsy();
  });
});