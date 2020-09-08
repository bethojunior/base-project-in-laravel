<?php


namespace App\Services\User;


use App\Constants\UserConstant;
use App\Constants\UserStatusConstant;
use App\Http\Responses\ApiResponse;
use App\Repositories\User\UserRepository;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    private $repository;

    /**
     * UserService constructor.
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getAll(){
        return $this->repository->findAll();
    }

    /**
     * @param array $request
     * @return mixed
     */
    public function searchUser(array $request)
    {
        return $this->repository->searchUser($request);
    }

    /**
     * @param User $user
     * @param array $request
     * @return User
     */
    public function update(User $user, array $request)
    {
        if (isset($request['picture'])) {
            $filename =
                \Storage::disk('userprofile')->putFile($user->id, $request['picture']);

            $user->picture = $filename;
        }

        $user->name = $request['name'] ?? $user->name;
        $user->email = $request['email'] ?? $user->email;
        $user->phone = $request['phone'] ?? $user->phone;
        $user->password = isset($request['password']) ?
            bcrypt($request['password']) :
            $user->password;

        $user->save();

        return $user;
    }

    public function insertUser(array $request)
    {
        try{
            DB::beginTransaction();


            $data = [
                'name'              => $request['name'],
                'email'             => $request['email'],
                'phone'             => $request['phone'],
                'user_type_id'      => $request['user_type_id'],
                'enterprises_id'    => $request['enterprises_id'] ?? null,
                'user_status_id'    => UserStatusConstant::ACTIVE,
                'password'          => Hash::make($request['password']),
            ];

            $user = new User($data);

            if (isset($request['profile-image-user'])) {
                $filename =
                    \Storage::disk('userprofile')->putFile($user->id, $request['profile-image-user']);

                $user->picture = $filename;
            }

            $user->save();

            DB::commit();

        }catch (\Exception $exception){
            DB::rollBack();
            throw $exception;
        }
        return $user;
    }

    /**
     * @param $id
     * @return array|\Illuminate\Database\Concerns\BuildsQueries[]|\Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model[]
     */
    public function findById($id)
    {
        return $this->repository
            ->findById($id);
    }


    /**
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object
     * @throws \Exception
     */
    public function authenticate(array $data)
    {
        $user = $this->repository->authenticate($data);

        if (!$user)
            throw new \Exception('Usuário não encontrado');

        if (!Hash::check($data['password'] , $user->password))
            throw new \Exception('Senha inválida');

        return $user;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model[]
     */
    public function findAllEnterprises()
    {
        return $this->repository->findAllWithoutPaginate();
    }
}
