export const getPathName = (path) => {
    const segments = path.split('/');
    return segments.length > 1 ? segments[1] : '';// Returns the last segment of the path
  };

  export const getPageName = async (path) => {
    const componentName = getPathName(path);
    const lowercaseComponent = componentName.toLowerCase(); // Convert component name to lowercase
    switch (lowercaseComponent) {
      case 'employee':
        return "ນັກສືກສາ";
      case 'category':
        return "ສ້າງຫ້ອງຮຽນ";
      default:
        return "ລາຍງານ";
    }
  }