"use client"

import { useState, useEffect } from 'react';
import { Layout } from '../test/page';
import axios from 'axios';

interface User {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  company?: {
    department?: string;
  };
  hair: {
    color: string;
  };
  address?: {
    postalCode?: string;
  };
}

interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: any;
  hair: any;
  addressUser: Record<string, string | undefined>;
}


const ageRanges = (ages: number[]): Record<string, number> => {
  const result = ages.reduce((ranges: any, age: any) => {
    const range = getAgeRange(age);
    ranges[range] = (ranges[range] || 0) + 1;
    return ranges;
  }, {});

  return result;
};

const getAgeRange = (age: number): string => {
  if (age < 20) return '0-19';
  if (age < 30) return '20-29';
  if (age < 40) return '30-39';
  if (age < 50) return '40-49';
  if (age < 60) return '50-59';
  return '60+';
};


export default function Home() {
  const [datas, setDatas] = useState<any>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        const users: User[] = response?.data?.users || [];

        if (users?.length > 0) {
          const _datas = users.reduce((result: Record<string, DepartmentSummary>, item: User) => {
            const department = item.company?.department;
            const gender = item.gender;
            const hairColor = item.hair.color;
            const age = Number(item.age);
            const fullName = `${item.firstName || '-'}${item.lastName || '-'}`;
            const postalCode = item.address?.postalCode || '-';

            if (department) {
              result[department] ??= {
                male: 0,
                female: 0,
                ageRange: [],
                hair: {},
                addressUser: {},
              };

              if (gender)
                result[department][gender]++;
              if (age)
                result[department].ageRange.push(age);
              if (hairColor)
                result[department].hair[hairColor] = Number(result[department].hair[hairColor] || 0) + 1;
              if (fullName && postalCode)
                result[department].addressUser[fullName] = postalCode;
            }

            return result;
          }, {});

          Object.values(_datas).forEach((department) => {
            department.ageRange = ageRanges(department.ageRange);
          });

          setDatas(_datas);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <DataTable data={datas} />
    </Layout>
  );
};

const DataTable = ({ data }) => {
  return (
    <div className="p-10">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Male</th>
            <th className="py-2 px-4">Female</th>
            <th className="py-2 px-4">Age Range</th>
            <th className="py-2 px-4">Hair Color</th>
            <th className="py-2 px-4">Address User</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([department, e]) => (
            <tr key={department} className="border-b">
              <td className="py-2 px-4">{department}</td>
              <td className="py-2 px-4 text-center">{e.male}</td>
              <td className="py-2 px-4  text-center">{e.female}</td>
              <td className="py-2 px-4">
                {Object.entries(e.ageRange).map(([age, count]) => (
                  <div>{age} {`==>`} {count}</div>
                ))}
              </td>
              <td className="py-2 px-4">
                {Object.entries(e.hair).map(([hair, count]) => (
                  <div>{hair} {`==>`} {count}</div>
                ))}
              </td>
              <td className="py-2 px-4">
                {Object.entries(e.addressUser).map(([User, count]) => (
                  <div>{User} {`==>`} {count}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};