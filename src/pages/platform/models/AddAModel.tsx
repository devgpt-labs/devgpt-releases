import { Flex, Box, Skeleton, Grid, Text, Button } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import repoStore from "@/store/Repos";

//components
import Template from "@/components/Template";

const AddAModel = () => {
  const { repos, repoWindowOpen, setRepoWindowOpen }: any = repoStore();

  return (
    <Template>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
        height="100%"
      >
        <Text>No models found yet</Text>
        <Button
          onClick={() => {
            setRepoWindowOpen(!repoWindowOpen);
          }}
          rightIcon={<SmallAddIcon />}
        >
          Train A New Model
        </Button>
      </Flex>
    </Template>
  );
};

export default AddAModel;
