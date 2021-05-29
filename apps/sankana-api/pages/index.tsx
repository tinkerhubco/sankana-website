import { GetServerSideProps } from 'next';

const Index = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://sankana.tinkerhub.dev',
      permanent: true,
    },
  };
};

export default Index;
