import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

interface SpecializationAttributes {
  specializationId: number;
  specializationName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SpecializationCreationAttributes extends Optional<SpecializationAttributes, 'specializationId' | 'createdAt' | 'updatedAt'> {}

class Specialization extends Model<SpecializationAttributes, SpecializationCreationAttributes> implements SpecializationAttributes {
  public specializationId!: number;
  public specializationName!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Specialization.init(
  {
    specializationId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    specializationName: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Specialization',
    tableName: 'Specializations',
    timestamps: false,
    underscored: false,
  }
);

export default Specialization;
