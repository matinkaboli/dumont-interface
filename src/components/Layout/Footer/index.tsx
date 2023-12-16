import React from 'react';
import Round from './Round';
import Controller from './Controller';

const Footer = () => {
  return (
    <div className="flex justify-between items-center text-white">
      <Controller />
      <Round />
    </div>
  );
};

export default Footer;
