import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class Doctor extends Model {
  public doctorId!: number;
  public specializationId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init(
  {
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    specializationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Specializations',
        key: 'specializationId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Doctor',
    tableName: 'Doctors',
    timestamps: true,
    underscored: false,
  }
);

export default Doctor;
