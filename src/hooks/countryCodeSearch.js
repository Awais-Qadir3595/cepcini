import { useEffect, useState } from 'react';

const useCountryCodeSearch = (searchText, countriesList) => {
    const [updatedList, setUpdatedList] = useState(countriesList);

    useEffect(() => {
        const searchCountry = () => {
            const filterData = countriesList.filter(
                item =>
                    item.countryName.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.countryCode.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.dialingCode.includes(searchText),
            );
            setUpdatedList(filterData);
        };

        searchCountry();
    }, [searchText, countriesList]);

    return updatedList;
};

export default useCountryCodeSearch;